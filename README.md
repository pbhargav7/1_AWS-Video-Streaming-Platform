# Introducing Our Video Streaming Platform: A Secure, On-Demand Solution Like Hulu, Netflix, and More

In today's digital landscape, video has emerged as the primary means of information sharing and learning. Businesses, educational institutions, and government agencies are increasingly leveraging the power of video to communicate, educate, and engage with their audiences. As a result, the demand for secure and innovative solutions to deliver and protect video content has never been greater.

For organizations like medical institutions, universities, schools, corporations, OTT and media businesses, intellectual privacy and piracy organizations, lawyers, and government offices, security is of paramount importance. Both live streaming and video-on-demand (VOD) platforms offer powerful tools for businesses and enterprises to boost revenue, communicate effectively, and build an audience.

Our video streaming platform aims to provide a secure, on-demand solution that rivals industry leaders like Hulu and Netflix. By harnessing the power of AWS, we have created a fully automated and secure video-on-demand solution using Amazon S3 and Amazon CloudFront, eliminating the need for traditional server-based transcoding.

In this project, we'll build you through the process of creating our own video streaming platform, taking advantage of AWS services to deliver a streamlined, cost-effective, and secure experience for your users.

### ScreenShots

![Sign In Page](https://raw.githubusercontent.com/denyshubh/images/main/ott/Screenshot%202023-04-26%20at%203.29.00%20PM.png)
![Video Player](https://raw.githubusercontent.com/denyshubh/images/main/ott/Screenshot%202023-04-26%20at%203.30.49%20PM.png)
![Videos Catalog Page](https://raw.githubusercontent.com/denyshubh/images/main/ott/Screenshot%202023-05-03%20at%2010.26.04%20PM.png)
![Video Upload](https://raw.githubusercontent.com/denyshubh/images/main/ott/Screenshot%202023-04-26%20at%203.30.15%20PM.png)
![Sign Up Page](https://raw.githubusercontent.com/denyshubh/images/main/ott/Screenshot%202023-04-26%20at%203.29.11%20PM.png)

## Architecture Evolution

The project has undergone a significant evolution in terms of architecture, starting from a simple UI to a fully-fledged Video On Demand solution using AWS services.

## 1. Initial UI and S3 Video Playback

- The project began with a simple user interface that played videos uploaded to Amazon S3.
- CORS was used to enable cross-origin resource sharing for video playback.
- ![Initial UI and S3 Video Playback](https://raw.githubusercontent.com/denyshubh/images/main/Video%20On%20Demand%20-%20Page%203.png)

## 2. Adoption of AWS Video On Demand Solution

- The architecture then transitioned to incorporate AWS Video On Demand Solution for a more comprehensive and scalable approach.
- ![AWS Video On Demand Solution](https://raw.githubusercontent.com/denyshubh/images/main/Video%20On%20Demand%20-%20Page%201.svg)

## 3. Extending AWS Video On Demand Solution

- In the final phase, the default AWS Video On Demand Solution was extended and customized to meet the project's specific requirements.
- This allowed for greater flexibility and better alignment with project goals.
- ![Extended AWS Video On Demand Solution](https://raw.githubusercontent.com/denyshubh/images/main/Video%20On%20Demand%20-%20Page%202.svg)

![AWS MEDIA PACKAGE](https://raw.githubusercontent.com/denyshubh/images/main/ott/Screenshot%202023-04-26%20at%204.53.20%20PM.png)

## Benefits of Using Current Architecture

![Current Architecture](https://raw.githubusercontent.com/denyshubh/images/main/Video%20On%20Demand%20-%20Page%202.svg)

### Benefits of Current Architecture

1. **Serverless Architecture leading to low cost**:
   By leveraging a serverless architecture, inspired by [A Cloud Guru](https://acloudguru.com/), the platform minimizes infrastructure costs and simplifies scaling.

2. **Modular architecture with Step Functions**:
   The use of AWS Step Functions allows for a modular architecture, making it easier to manage, update, and maintain the solution.

3. **Easy User Management with AWS Cognito Service**:
   AWS Cognito Service streamlines user management, providing a secure and efficient way to authenticate and manage users.

4. **Seamless connection of AWS Resources using AWS Amplify library**:
   The AWS Amplify library simplifies the integration of AWS resources with the client application.
   - `amplify add auth`: Sets up Cognito for user authentication.
   - `amplify add storage`: Configures Amazon S3 for storage.
   - `amplify import storage`: Imports existing Amazon S3 storage.

5. **React-based modular UI**:
   The user interface is built using React, which promotes modular design and a responsive, user-friendly experience.

6. **Project Management with Azure DevOps**:
   Azure DevOps was employed to manage the project using Agile methodologies, ensuring efficient development and timely delivery.

### Video On Demand Solution Architecture

1. **Frontend**: React application with AWS Amplify integration for authentication, storage, and API access.
2. **User Management**: AWS Cognito Service for user authentication and role-based access control.
3. **Video Processing**: AWS Media Package for video transcoding, packaging, and delivery.
4. **Content Distribution**: Amazon CloudFront for fast and secure content delivery.
5. **Storage**: Amazon S3 for storing video files and associated metadata.
6. **Serverless Functions**: AWS Lambda for executing custom logic in response to events.
7. **Orchestration**: AWS Step Functions for managing and coordinating serverless functions.
8. **Monitoring and Logging**: Amazon CloudWatch for monitoring performance and logging events.

### Few More Benefits

1. Scalability of video delivery solution using the CloudFront CDN
2. Security of video content to prevent unauthorized access and ensure it can’t be played outside the customer’s application using S3 and CloudFront signed URLs
3. Automated transcoding of video content using MediaConvert
4. Support for multiple devices using adaptive bitrate streaming for playback in all network conditions without buffering delays
5. Securely storing and retrieving secret keys from Secrets Manager
6. Quickly building and deploying the solution using Amplify and CloudFormation

## Challenges faced during the development process

Building a custom OTT platform for video on demand can be a complex task, especially when trying to leverage existing cloud-based solutions such as AWS _Video On Demand_. In this document, we outline some of the key challenges faced during the development process and the solutions implemented to address these issues.

1. **Custom Video Player Integration:**
One of the primary challenges was the integration of a video player that supports HLS and provides manual control over the bit rate. To overcome this challenge, a custom video plugin was developed for better bit rate management, offering enhanced control and performance.

2. **Cost Management:**
The project aimed to minimize costs while delivering a high-quality solution. This objective was successfully achieved by leveraging AWS services and adopting a serverless architecture, which substantially reduced infrastructure costs.

3. **Initial Containerization and Transition to Serverless:**
Initially, the project utilized containerization with EKS and StreamIo, but due to the need for extensive customization, this approach was deemed unsuitable. Instead, a complete serverless solution was adopted using AWS Lambda, Step Functions, and other services to minimize cost and streamline the platform.

4. **Signed Cookies for CloudFront:**
Implementing signed cookies for CloudFront for each video URL proved challenging. However, the team managed to generate and securely implement these cookies, ensuring secure video access and improved user experience.

5. **User Segregation:**
The platform required different levels of access for users, such as admins and subscribed users. To address this, AWS Cognitive Services were employed to segregate users and provide appropriate access based on their roles.

6. **Media Package vs. AWS Elastic Transcoder:**
One of the most crucial decisions was choosing between AWS Media Package and AWS Elastic Transcoder for video processing. After evaluating both solutions, the team opted for AWS Media Package due to its comprehensive feature set, which better aligned with the project's requirements and goals.

### Conclusion

Developing a custom OTT platform for video on demand using AWS Video On Demand Solution presented numerous challenges. However, by leveraging the power of AWS services and adopting innovative solutions, the team successfully overcame these obstacles, resulting in an efficient and cost-effective platform tailored to the project's unique needs.

## Future Scope

The following improvements and features are planned for future development of the project:

### 1. Subscription Service

- Implement a subscription service using Stripe for secure payments and managing user subscriptions.
- Leverage the existing AWS group configuration for handling different user subscription tiers (Groups - Admin, Subscriber, Users).
- Status: In progress

### 2. Bitrate Control on Video Player

- Enhance the custom video player with manual bitrate control to improve user experience and bandwidth utilization.
- Status: In progress

### 3. UI Improvements

- Refine the user interface to offer a more engaging, responsive, and user-friendly experience.

### 4. Recommendation and History Microservices

- Introduce recommendation and history microservices to provide personalized content suggestions and keep track of user viewing history.

### 5. Video Thumbnails based on Frame Capture

- Enable frame capture from AWS Media Convertor to generate video thumbnails for a richer browsing experience.
- Currently disabled due to cost concerns.

### 6. Migration to Elastic Container Service and Fargate

- Evaluate the potential benefits of migrating from AWS EC2 to Elastic Container Service and Fargate for better container management and scaling.
- Not attempted yet due to cost concerns.
