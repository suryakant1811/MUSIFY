resource "aws_iam_role" "eks_cluster_role" {
    name = "eks_cluster_role"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }

      Action = "sts:AssumeRole"
    }]

  })

}

resource "aws_iam_role_policy_attachment" "eks_cluster_ploicy" {
    role = aws_iam_role.eks_cluster_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}