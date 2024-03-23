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


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)


        
def scan_table():
    response = table.scan()
    items = response.get('Items', [])
    return items


def lambda_handler(event, context):
    print(event)
    guid = event['pathParameters'].get('guid') if event.get('pathParameters') else None
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
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        'body': json.dumps(result, cls=DecimalEncoder) 
    }