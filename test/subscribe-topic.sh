aws sns subscribe \
    --topic-arn arn:aws:sns:us-west-2:[ACCOUNT]:[TABLE] \
    --protocol email \
    --notification-endpoint [EMAIL_ADDRESS]
