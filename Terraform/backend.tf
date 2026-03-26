terraform {
  backend "s3" {
    bucket = "Musify-s3-bucket-for-state-lock"
    key = "prod/terraform.state"
    dynamodb_table = "Musify-dynamodb-table-for-state-lock"
    region = "us-east-1"
  }
}