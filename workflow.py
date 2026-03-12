import time

config = {
    "workflow": ["RECEIVED", "VALIDATION", "RULE_CHECK", "DECISION"],
    "rules": {
        "approve_limit": 50000,
        "manual_limit": 100000
    }
}

audit_log = []
processed_requests = set()

def log_action(request_id, stage, message):
    record = {
        "request_id": request_id,
        "stage": stage,
        "message": message,
        "time": time.ctime()
    }
    audit_log.append(record)
    print(record)

def evaluate_rules(amount):
    if amount <= config["rules"]["approve_limit"]:
        return "APPROVED"
    elif amount <= config["rules"]["manual_limit"]:
        return "MANUAL_REVIEW"
    else:
        return "REJECTED"

def retry_request(request):
    print("Retrying request...")
    time.sleep(1)
    return process_request(request)

def process_request(request):
    request_id = request["id"]

    try:
        if request_id in processed_requests:
            print("Duplicate request detected")
            return

        processed_requests.add(request_id)

        log_action(request_id, "RECEIVED", "Request received")

        if "amount" not in request:
            log_action(request_id, "VALIDATION", "Missing amount field")
            return "REJECTED"

        log_action(request_id, "VALIDATION", "Data validated")

        decision = evaluate_rules(request["amount"])

        log_action(request_id, "RULE_CHECK", "Rules evaluated")
        log_action(request_id, "DECISION", decision)

        return decision

    except Exception as e:
        log_action(request_id, "ERROR", str(e))
        return retry_request(request)

print("\nWorkflow Decision System\n")

request_id = int(input("Enter Request ID: "))
name = input("Enter User Name: ")
amount = float(input("Enter Amount: "))

request_data = {
    "id": request_id,
    "name": name,
    "amount": amount
}

result = process_request(request_data)

print("\nFinal Decision:", result)

print("\nAudit Trail:")
for log in audit_log:
    print(log)