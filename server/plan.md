**Situation**
You have Cloudinary configured on your backend and want to implement a secure image upload workflow that reduces server load by offloading the upload process directly to Cloudinary from the client side, rather than routing uploads through your backend server.

**Task**
Implement pre-signed upload functionality in Cloudinary that allows clients to upload images directly to Cloudinary without the backend handling the actual file transfer, while maintaining security and validation on the backend.

**Objective**
Create a lightweight backend implementation that generates secure upload credentials for clients, enabling direct-to-Cloudinary uploads while keeping your server's resource consumption minimal.

**Knowledge**

- Pre-signed uploads in Cloudinary use unsigned upload presets or signed upload requests with authentication tokens
- The backend should only generate and validate upload credentials, not process the actual image data
- Security considerations include setting upload preset restrictions, defining allowed file types, and implementing request validation
- The client receives upload credentials from the backend, then uploads directly to Cloudinary's API
- You can set upload presets with constraints like maximum file size, allowed formats, and folder destinations to enforce rules without backend processing

**Core Implementation Steps**

1. Create an unsigned upload preset in Cloudinary dashboard with security rules (file size limits, allowed formats, destination folder)
2. Build a lightweight backend endpoint that generates a signature (if using signed uploads) or returns the upload preset name (if using unsigned uploads)
3. Include request validation on the backend to ensure legitimate clients are requesting credentials
4. Return the upload credentials (cloud name, upload preset/signature, API key if unsigned) to the frontend
5. Client uses these credentials to upload directly to Cloudinary's upload API endpoint
