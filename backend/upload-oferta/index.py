import os
import boto3
import requests

def handler(event: dict, context) -> dict:
    """Скачивает оферту с Яндекс.Диска и загружает в S3"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    # Публичная ссылка Яндекс.Диска — получаем прямой URL через API
    public_key = 'https://disk.yandex.ru/d/b1I5K1Ij9wIh+kLpNEEnuaG0hoHKQkqjRnqca2GgLY5cvS50tdyU8CAelMLUd4w6q/J6bpmRyOJonT3VoXnDag=='
    path = '/публичная оферта/14_3_2025_Публичная_оферта_.pdf'

    meta_url = 'https://cloud-api.yandex.net/v1/disk/public/resources/download'
    meta_resp = requests.get(meta_url, params={'public_key': public_key, 'path': path}, timeout=15)
    download_url = meta_resp.json().get('href')

    if not download_url:
        return {'statusCode': 500, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': f'No download URL: {meta_resp.text}'}

    pdf_resp = requests.get(download_url, timeout=30)
    pdf_bytes = pdf_resp.content

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(
        Bucket='files',
        Key='docs/oferta.pdf',
        Body=pdf_bytes,
        ContentType='application/pdf'
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/docs/oferta.pdf"
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': f'{{"url": "{cdn_url}"}}'
    }
