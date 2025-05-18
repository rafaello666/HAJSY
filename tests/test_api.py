import os
import importlib
import json
def create_app(tmp_path):
    os.environ['DB_PATH'] = str(tmp_path / 'test.db')
    if 'backend.app' in globals():
        importlib.reload(globals()['backend.app'])
    import backend.app as app_module
    importlib.reload(app_module)
    app_module.init_db()
    return app_module.app

def test_expenses_empty(tmp_path):
    app = create_app(tmp_path)
    client = app.test_client()
    resp = client.get('/api/expenses')
    assert resp.status_code == 200
    assert resp.get_json() == []

def test_add_and_summary(tmp_path):
    app = create_app(tmp_path)
    client = app.test_client()
    resp = client.post('/api/expenses', json={'amount': 10, 'category': 'jedzenie'})
    assert resp.status_code == 200
    assert resp.get_json()['status'] == 'ok'
    resp = client.get('/api/summary')
    data = resp.get_json()
    assert data['total'] == 10
    assert any(c['category']=='jedzenie' and c['sum']==10 for c in data['by_category'])