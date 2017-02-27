

PUT
http://localhost:3000/bev_orders_to_process

On success:

{
  "lastErrorObject": {
    "updatedExisting": true,
    "n": 1
  },
  "value": {
    "_id": "58b47ed39412f24ce0e674be",
    "cust_id": "333",
    "beverages": [
      {
        "code": "w_grants_750",
        "count": 3,
        "price": 600
      },
      {
        "code": "w_blenders_750",
        "count": 5,
        "price": 126
      }
    ],
    "total": 2430,
    "status": "IN_PROGRESS",
    "creationDate": "2017-02-27T19:32:35.223Z"
  },
  "ok": 1
}

No more open orders:
{
  "lastErrorObject": {
    "updatedExisting": false,
    "n": 0
  },
  "value": null,
  "ok": 1
}