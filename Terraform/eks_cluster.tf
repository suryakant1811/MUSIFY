resource "aws_eks_cluster" "eks_cluster" {
    name = "MUSIDY-CLUSTER"
    role_arn = aws_iam_role.eks_cluster_role.arn

    vpc_config {
      subnet_ids = [ 
        aws_subnet.private_subnet_1,
        aws_subnet.private_subnet_2,
        aws_subnet.private_subnet_3
       ]
    }

    depends_on = [ aws_iam_role_policy_attachment.eks_cluster_policy ]

}