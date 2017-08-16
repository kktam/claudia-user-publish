{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1502857340000",
            "Effect": "Allow",
            "Action": [
                "dynamodb:DescribeStream",
                "dynamodb:GetRecords",
                "dynamodb:GetShardIterator",
                "dynamodb:ListStreams"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-west-2:[ACCOUNT]:table/[TABLE]/stream/2017-08-13T15:52:37.812"
            ]
        }
    ]
}
