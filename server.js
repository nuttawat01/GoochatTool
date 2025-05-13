const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const app = express();

const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Proxy endpoint for room information
app.post('/api/rooms', async (req, res) => {
    try {
        const response = await axios.post('https://sit.apigoochat.net/gochat/v1/rooms', {
            page: 1,
            dateTime: "12 May 2025 22:44:40",
            limit: 10000
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'],
                'Os-Version': req.headers['os-version'],
                'Accept-Language': req.headers['accept-language'],
                'Platform': req.headers['platform'],
                'Device-Id': req.headers['device-id']
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
    }
});

// Original endpoint for phone verification
app.post('/api/auth/otp/signup/verify', async (req, res) => {
    try {
        console.log('Signup verify request:', req.body);
        const response = await axios.post('https://sit.apigoochat.net/gochat/v1/auth/otp/signup/verify', 
            {
                countryCode: req.body.countryCode,
                dialCode: req.body.dialCode,
                mobile: req.body.mobile,
                code: req.body.code,
                referenceCode: req.body.referenceCode,
                acceptTermCondition: req.body.acceptTermCondition,
                fcmToken: req.body.fcmToken
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'App-Version': '1.9.0',
                    'Os-Version': '12.0',
                    'Accept-Language': 'en',
                    'Platform': 'android',
                    'Device-Id': req.headers['device-id']
                }
            }
        );
        console.log('Signup verify response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error in signup verify:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            requestBody: req.body
        });
        res.status(error.response?.status || 500).json(error.response?.data || { 
            message: 'Internal server error',
            statusCode: '500'
        });
    }
});

// Proxy endpoint for changing display name
app.post('/api/profile/name', async (req, res) => {
    try {
        const response = await axios.post('https://sit.apigoochat.net/gochat/v1/profile/name', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'],
                'Os-Version': req.headers['os-version'],
                'Accept-Language': req.headers['accept-language'],
                'Platform': req.headers['platform'],
                'Device-Id': req.headers['device-id']
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
    }
});

// Proxy endpoint for sending messages
app.post('/api/chat/send', async (req, res) => {
    try {
        const response = await axios.post('https://sit.apigoochat.net/gochat/v1/chat/send', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'],
                'Os-Version': req.headers['os-version'],
                'Accept-Language': req.headers['accept-language'],
                'Platform': req.headers['platform'],
                'Device-Id': req.headers['device-id']
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        if (error.response) {
            res.status(error.response.status).json({
                statusCode: error.response.data.statusCode || error.response.status.toString(),
                code: error.response.data.code || "",
                message: error.response.data.message || "System cannot process this request at the moment. Please try again later.",
                version: error.response.data.version || "",
                data: error.response.data.data || null
            });
        } else if (error.request) {
            res.status(500).json({
                statusCode: "500",
                message: "No response received from the server",
                version: "",
                data: null
            });
        } else {
            res.status(500).json({
                statusCode: "500",
                message: error.message || "Internal server error",
                version: "",
                data: null
            });
        }
    }
});

// Proxy endpoint for profile information
app.post('/api/profile/me', async (req, res) => {
    try {
        const response = await axios.post('https://sit.apigoochat.net/gochat/v1/profile/me', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'],
                'Os-Version': req.headers['os-version'],
                'Accept-Language': req.headers['accept-language'],
                'Platform': req.headers['platform'],
                'Device-Id': req.headers['device-id']
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
    }
});

// สร้างอัลบั้ม
app.post('/api/chat/album/create', async (req, res) => {
    try {
        const { sessionId, mediaCount, albumName } = req.body;
        const accessToken = req.headers.authorization;

        const response = await fetch('https://sit.apigoochat.net/gochat/v1/chat/album/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'App-Version': '1.9.0',
                'Os-Version': '12.0',
                'Accept-Language': 'en',
                'Platform': 'android',
                'Device-Id': crypto.randomUUID()
            },
            body: JSON.stringify({
                sessionId,
                mediaCount,
                albumName
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ error: 'Failed to create album' });
    }
});

// อัพเดทอัลบั้ม
app.post('/api/chat/album/update', async (req, res) => {
    try {
        const { 
            sessionId, 
            albumId, 
            actionName, 
            mediaUploadId, 
            mediaAlbum, 
            referenceKey 
        } = req.body;
        const accessToken = req.headers.authorization;

        const response = await fetch('https://sit.apigoochat.net/gochat/v1/chat/album/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'App-Version': '1.9.0',
                'Os-Version': '12.0',
                'Accept-Language': 'en',
                'Platform': 'android',
                'Device-Id': crypto.randomUUID()
            },
            body: JSON.stringify({
                sessionId,
                albumId,
                actionName,
                mediaUploadId,
                mediaAlbum,
                referenceKey
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error updating album:', error);
        res.status(500).json({ error: 'Failed to update album' });
    }
});

// สร้างโน็ต
app.post('/api/chat/note/create', async (req, res) => {
    try {
        const { contentNote, sessionId } = req.body;
        const accessToken = req.headers.authorization;

        const response = await axios.post('https://sit.apigoochat.net/gochat/v1/chat/note/create', {
            contentNote,
            sessionId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'App-Version': '1.9.0',
                'Os-Version': '12.0',
                'Accept-Language': 'en',
                'Platform': 'android',
                'Device-Id': req.headers['device-id']
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating note:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { 
            message: 'Failed to create note',
            statusCode: error.response?.status || '500',
            code: error.response?.data?.code || '',
            data: null
        });
    }
});

// Pin message endpoint
app.post('/api/chat/pin', async (req, res) => {
    try {
        const { sessionId, messageId } = req.body;
        const response = await fetch('https://sit.apigoochat.net/gochat/v1/chat/pin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'] || '1.9.0',
                'Os-Version': req.headers['os-version'] || '12.0',
                'Accept-Language': req.headers['accept-language'] || 'en',
                'Platform': req.headers['platform'] || 'android',
                'Device-Id': req.headers['device-id'] || crypto.randomUUID()
            },
            body: JSON.stringify({
                sessionId,
                messageId
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error pinning message:', error);
        res.status(500).json({ 
            statusCode: "500",
            code: error.code || "9999",
            message: error.message || "Failed to pin message" 
        });
    }
});

// Reply message endpoint
app.post('/api/chat/reply', async (req, res) => {
    try {
        const { replyMsgId, sessionId, referenceKey, contentType, content } = req.body;
        const response = await fetch('https://sit.apigoochat.net/gochat/v1/chat/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'] || '1.9.0',
                'Os-Version': req.headers['os-version'] || '12.0',
                'Accept-Language': req.headers['accept-language'] || 'en',
                'Platform': req.headers['platform'] || 'android',
                'Device-Id': req.headers['device-id'] || crypto.randomUUID()
            },
            body: JSON.stringify({
                replyMsgId,
                sessionId,
                referenceKey,
                contentType,
                content
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error replying to message:', error);
        res.status(500).json({ 
            statusCode: "500",
            code: error.code || "9999",
            message: error.message || "Failed to reply to message" 
        });
    }
});

// Group setting create endpoint
app.post('/api/group/setting/create', upload.none(), async (req, res) => {
    try {
        console.log('Received group creation request:', req.body);
        
        // Create form data
        const form = new FormData();
        form.append('groupName', req.body.groupName);

        // Log the form data
        console.log('Form data:', {
            groupName: req.body.groupName,
            headers: form.getHeaders()
        });

        const response = await axios.post(
            'https://sit.apigoochat.net/gochat/v1/group/setting/create',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'Authorization': req.headers.authorization,
                    'App-Version': req.headers['app-version'] || '1.9.0',
                    'Os-Version': req.headers['os-version'] || '12.0',
                    'Accept-Language': req.headers['accept-language'] || 'en',
                    'Platform': req.headers.platform || 'android',
                    'Device-Id': req.headers['device-id']
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        console.log('API Response:', response.data);
        res.json(response.data);

        // ซื้อสติกเกอร์สำหรับสมาชิกใหม่
        const members = [];
        for (let i = 0; i < 10; i++) {
            const phone = `08${Math.floor(Math.random() * 900000000) + 100000000}`;
            const token = `Bearer ${Math.random().toString(36).substring(7)}`;
            members.push({
                phone: phone,
                token: token,
                displayName: `member ${i + 1} ${phone}`
            });

            try {
                currentOperation.textContent = `กำลังซื้อสติกเกอร์ให้สมาชิก ${i + 1}/${memberCount}`;
                const purchaseResponse = await fetch('https://sit.apigoochat.net/gochat/v1/sticker/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'App-Version': '1.9.0',
                        'Os-Version': '12.0',
                        'Accept-Language': 'en',
                        'Platform': 'android',
                        'Device-Id': crypto.randomUUID()
                    },
                    body: JSON.stringify({
                        packageId: "651bdffda8dfd223058ccc7e"
                    })
                });
                const purchaseData = await purchaseResponse.json();
                console.log(`Sticker purchase for member ${phone}:`, purchaseData);
            } catch (purchaseError) {
                console.error(`Error purchasing sticker for member ${phone}:`, purchaseError);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            requestHeaders: error.config?.headers,
            requestData: error.config?.data
        });
        res.status(error.response?.status || 500).json(error.response?.data || {
            statusCode: "500",
            message: error.message || "Internal server error"
        });
    }
});

// Group join endpoint
app.post('/api/group/join', async (req, res) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization,
            'App-Version': req.headers['app-version'],
            'Os-Version': req.headers['os-version'],
            'Accept-Language': req.headers['accept-language'],
            'Platform': req.headers.platform,
            'Device-Id': req.headers['device-id']
        };

        const payload = {
            joinBy: req.body.joinBy || "LINK",
            qrCode: req.body.qrCode || "",
            sessionId: req.body.sessionId
        };

        const response = await fetch('https://sit.apigoochat.net/gochat/v1/group/join', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in group join:', error);
        res.status(500).json({
            statusCode: "500",
            message: "Internal server error",
            error: error.message
        });
    }
});

// Sticker purchase endpoint
app.post('/api/sticker/purchase', async (req, res) => {
    try {
        const response = await fetch('https://sit.apigoochat.net/gochat/v1/sticker/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                'App-Version': req.headers['app-version'] || '1.9.0',
                'Os-Version': req.headers['os-version'] || '12.0',
                'Accept-Language': req.headers['accept-language'] || 'en',
                'Platform': req.headers['platform'] || 'android',
                'Device-Id': req.headers['device-id'] || crypto.randomUUID()
            },
            body: JSON.stringify({
                packageId: req.body.packageId
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error purchasing sticker:', error);
        res.status(500).json({ 
            statusCode: "500",
            code: error.code || "9999",
            message: error.message || "Failed to purchase sticker" 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 