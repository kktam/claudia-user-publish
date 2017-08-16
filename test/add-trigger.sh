aws lambda create-event-source-mapping \
    --region us-west-2 \
    --function-name claudia-user-publish \
    --event-source streamARN  \
    --batch-size 1 \
    --starting-position TRIM_HORIZON
