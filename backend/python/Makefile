.PHONY: test benchmark clean run-daemon

test:
	python3 -m unittest discover -s tests -p "test_*.py"

benchmark:
	python3 scripts/evaluate_all.py

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

run-daemon:
	python3 -m src.newsx.continuous
