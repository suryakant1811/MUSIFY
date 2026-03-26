resource "aws_iam_role" "node_role" {

  name = "eks-node-role-1"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [{

      Effect = "Allow"

      Principal = {
        Service = "ec2.amazonaws.com"
      }

      Action = "sts:AssumeRole"

    }]

  })

}

resource "aws_iam_role_policy_attachment" "worker_node_policy" {

  role = aws_iam_role.node_role.name

  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"

}

resource "aws_iam_role_policy_attachment" "cni_policy" {

  role = aws_iam_role.node_role.name

  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"

}

resource "aws_iam_role_policy_attachment" "ecr_policy" {

  role = aws_iam_role.node_role.name

  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"

}
