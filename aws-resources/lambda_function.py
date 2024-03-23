import json
import boto3
import subprocess
import base64
import os
import time

from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
secretsmanager = boto3.client('secretsmanager')
table = dynamodb.Table('cloud-streaming-platform')

secret_arn = os.environ['SECRET_ARN']
secret_name = os.environ['SECRET_NAME']
key_pair_id = os.environ['KEY_PAIR_ID']

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)


def get_secret():
    try:
        response = secretsmanager.get_secret_value(SecretId=secret_arn)
    except Exception as e:
        raise e
    else:
        secret_text = response['SecretBinary']
        return secret_text
        
def scan_table():
    response = table.scan()
    items = response.get('Items', [])
    return items

def generate_signed_cookie(url, key_pair_id, private_key_pem):
    expires = int(time.time() + 86400)

    policy = {
        "Statement": [{
            "Resource": url,
            "Condition": {
                "DateLessThan": {"AWS:EpochTime": expires}
            }
        }]
    }
    policy = json.dumps(policy).encode("utf-8")
    policy_base64 = base64.urlsafe_b64encode(policy).decode("utf-8")

    with open('/tmp/priv_key.pem', 'w') as key_file:
        key_file.write(private_key_pem.decode('utf-8'))
     
    proc = subprocess.run(['openssl', 'rsautl', '-sign', '-inkey', '/tmp/priv_key.pem', '-out', '/tmp/signed_policy'],
                          input=policy, stderr=subprocess.PIPE, stdout=subprocess.PIPE)

    if proc.returncode != 0:
        raise Exception(f"OpenSSL error: {proc.stderr.decode('utf-8')}")

    with open('/tmp/signed_policy', 'rb') as signed_file:
        signature = signed_file.read()

    signature_base64 = base64.urlsafe_b64encode(signature).decode("utf-8")

    return {
        "CloudFront-Policy": policy_base64,
        "CloudFront-Signature": signature_base64,
        "CloudFront-Key-Pair-Id": key_pair_id
    }

def lambda_handler(event, context):
    guid = event['pathParameters'].get('guid') if 'pathParameters' in event else None
    if guid is None:
        items = scan_table()
        result = []
        for item in items:
            result.append({
                'guid': item['guid'],
                'srcMediainfo': item['srcMediainfo'],
            })
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(result)
        }

    response = table.get_item(Key={'guid': guid})
    item = response.get('Item', {})

    if not item:
        return {
            'statusCode': 404,
            'body': 'Item not found'
        }

    private_key_pem = get_secret()
    # signed_cookie = generate_signed_cookie(item['hlsUrl'], key_pair_id, private_key_pem)

    result = {
        'guid': item['guid'],
        'cloudFront': item['cloudFront'],
        'destBucket': item['destBucket'],
        'egressEndpoints': item['egressEndpoints'],
        'encodingProfile': item['encodingProfile'],
        'endTime': item['endTime'],
        'frameCapture': item['frameCapture'],
        'hlsPlaylist': item['hlsPlaylist'],
        'hlsUrl': item['hlsUrl'],
#        'signedCookie': signed_cookie,
        'srcBucket': item['srcBucket'],
        'srcHeight': item['srcHeight'],
        'srcMediainfo': item['srcMediainfo'],
        'srcVideo': item['srcVideo'],
        'srcWidth': item['srcWidth']
    }

    return {
        'statusCode': 200,
        'body': json.dumps(result, cls=DecimalEncoder) 
    }