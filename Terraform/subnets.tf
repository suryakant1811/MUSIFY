resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.vpc.id
  
}