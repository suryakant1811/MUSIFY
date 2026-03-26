resource "aws_instance" "public_server_1" {
    ami = "ami-0b6c6ebed2801a5cb"
    instance_type = "t3.micro"
    vpc_security_group_ids = [ aws_security_group.sg.id ]
    subnet_id = aws_subnet.public_subnet_1.id
    key_name = "key"
    tags = {
      Name = "bation_host_server"
    }
}

resource "aws_instance" "private_server_1" {
    ami =  "ami-0b6c6ebed2801a5cb"
    instance_type = "c7i-flex.large"
    key_name = "key"
    vpc_security_group_ids = [ aws_security_group.sg.id ]
    subnet_id = aws_subnet.private_subnet_1.id
    tags = {
      Name = "private_main_server"
    }
}