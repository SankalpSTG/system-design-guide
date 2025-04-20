interface EmailService {
  send(recipient: string, message: string): void
}

export class ZohoEmailService implements EmailService{
  private readonly zohoApiKey: string
  constructor(zohoApiKey: string){
    this.zohoApiKey = zohoApiKey
  }
  send(recipient: string, message: string): void {
    console.log(`Sending Email Via Zoho: ${recipient} says "${message}"`)
  }
}
export class AWSSimpleEmailService implements EmailService{
  private readonly awsSecretKey: string
  private readonly awsAccessKeyId: string
  constructor(awsSecretKey: string, awsAccessKeyId: string){
    this.awsAccessKeyId = awsAccessKeyId
    this.awsSecretKey = awsSecretKey
  }
  send(recipient: string, message: string): void {
    console.log(`Sending Email Via AWS SES: ${recipient} says "${message}"`)
  }
}

type AwsSimpleEmailServiceConfigType = {
  awsSecretKey: string
  awsAccessKeyId: string
}
type ZohoEmailServiceConfigType = {
  zohoApiKey: string
}
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

EmailServiceFactory.getEmailService({
  type: EmailServiceEnum.AwsSes,
  config: {
    awsAccessKeyId: "",
    awsSecretKey: ""
  }
}).send("AWS", "Hello World")

EmailServiceFactory.getEmailService({
  type: EmailServiceEnum.Zoho,
  config: {
    zohoApiKey: ""
  }
}).send("Zoho", "Hello World")