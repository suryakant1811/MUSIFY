output "public_server_ip" {
    value = aws_instance.public_server_1.public_ip
}

output "private_server_ip" {
    value = aws_instance.private_server_1.private_ip
}

