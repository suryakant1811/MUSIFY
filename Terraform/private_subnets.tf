resource "aws_subnet" "private_subnet_1" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.0.4.0/24"
    availability_zone = "us-east-1a"
    tags = {
      Name = "private_subnet_1"
    }
}

resource "aws_subnet" "private_subnet_2" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.0.5.0/24"
    availability_zone = "us-east-1b"
    tags = {
      Name = "private_subnet-2"
    }
}

resource "aws_subnet" "private_subnet_3" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.0.6.0/24"
    availability_zone = "us-east-1c"
    tags = {
      Name = "private_subnet_3"
    }
}