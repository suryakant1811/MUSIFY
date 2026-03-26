resource "aws_nat_gateway" "ng" {
    subnet_id = aws_subnet.private_subnet_1
    allocation_id = aws_eip.elastic_IP.id
    tags = {
      Name = "nat_gateway"
    }
}