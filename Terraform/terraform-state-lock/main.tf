resource "aws_s3_bucket" "bucket" {
    bucket = "Musify-s3-bucket-for-state-lock"
}

resource "aws_s3_bucket_versioning" "versinonmonh" {
    bucket = aws_s3_bucket.bucket.id
    versioning_configuration {
      status = "Enabled"
    }
}

resource "aws_dynamodb_table" "db" {
  name = "Musify-dynamodb-table-for-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}