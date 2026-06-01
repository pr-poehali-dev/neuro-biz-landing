import requests

def handler(event: dict, context) -> dict:
    """Проксирует запрос превью видео с Rutube для обхода CORS"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    video_id = (event.get('queryStringParameters') or {}).get('id', '')
    if not video_id:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': '{"error":"id required"}'}

    resp = requests.get(
        f'https://rutube.ru/api/video/{video_id}/',
        headers={'User-Agent': 'Mozilla/5.0'},
        timeout=10
    )

    if resp.status_code != 200:
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': f'{{"error":"rutube status {resp.status_code}"}}'}

    data = resp.json()
    thumbnail_url = data.get('thumbnail_url') or data.get('poster') or ''

    import json
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'thumbnail_url': thumbnail_url})
    }
