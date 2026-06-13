import kagglehub

# Download latest version
path = kagglehub.dataset_download("adityarajsrv/job-descriptions-2025-tech-and-non-tech-roles")

print("Path to dataset files:", path)
