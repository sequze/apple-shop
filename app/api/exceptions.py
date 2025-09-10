from fastapi import HTTPException, status

NotAllowed = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="Not Allowed",
)
