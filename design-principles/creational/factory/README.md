# Factory Pattern

We are implementing two email services in Typescript
1. AWS SES
2. Zoho Zeptomail

Both of these services have one ```send``` function which sends email.

To initialize the AWS SES and Zeptomail, both the services have different configurations. Hence we have created two types as follows
```typescript
type AwsSimpleEmailServiceConfigType = {
  awsSecretKey: string
  awsAccessKeyId: string
}

type ZohoEmailServiceConfigType = {
  zohoApiKey: string
}
```

From these two types, we have created a union type as follows
```typescript
enum EmailServiceEnum {
  Zoho = "zoho",
  AwsSes = "aws-ses"
}

export type GetAwsSimpleEmailServiceType = {
  type: EmailServiceEnum.AwsSes,
  config: AwsSimpleEmailServiceConfigType
}

export type GetZohoEmailServiceType = {
  type: EmailServiceEnum.Zoho,
  config: ZohoEmailServiceConfigType
}

type GetEmailServiceType = GetAwsSimpleEmailServiceType | GetZohoEmailServiceType

```

We created a factory class which has one factory method which takes the type of service as input, initializes the service and returns it
```typescript
class EmailServiceFactory {
  static getEmailService(data: GetEmailServiceType): EmailService{
    if(data.type == EmailServiceEnum.AwsSes){
      return new AWSSimpleEmailService(data.config.awsAccessKeyId, data.config.awsSecretKey)
    }
    else if (data.type == EmailServiceEnum.Zoho) {
      return new ZohoEmailService(data.config.zohoApiKey)
    }
    else throw new Error("Invalid Email Service Type")
  }
}
```

The entire code can be found in the ```index.ts``` file in the current folder.