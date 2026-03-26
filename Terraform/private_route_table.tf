resource "aws_route_table" "private_route_table" {
    vpc_id = aws_vpc.vpc.id
    route = {
        cidr_block = "0.0.0.0/0"
        nat_gateway = aws_nat_gateway.ng.id
    }
    tags = {
      Name = "private_route_table"
    }
}

resource "aws_route_table_association" "private_subnet_1_association" {
    route_table_id = aws_route_table.private_route_table.id
    subnet_id = aws_subnet.private_subnet_1.id
}

resource "aws_route_table_association" "private_subnet_2_association" {
    route_table_id = aws_route_table.private_route_table.id
    subnet_id = aws_subnet.private_subnet_2.id
}

resource "aws_route_table_association" "private_subnet_3_association" {
    route_table_id = aws_route_table.private_route_table.id
    subnet_id = aws_subnet.private_subnet_3.id
}