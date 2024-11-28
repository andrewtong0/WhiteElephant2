const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// The main map of instance IDs to app instance objects
const appInstances = {};

// API Key for authentication
const API_KEY = 'asdf';

// Middleware to check API key
function authenticate(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }
    next();
}

// PUT endpoint to store data (secured with API key authentication)
app.put('/store', authenticate, (req, res) => {
    const { instanceId, widgetId, propName, propValue } = req.body;

    if (!instanceId || !widgetId || !propName) {
        return res.status(400).json({ error: 'Missing required fields: instanceId, widgetId, or propName' });
    }

    // Initialize the instance if it doesn't exist
    if (!appInstances[instanceId]) {
        appInstances[instanceId] = {};
    }

    // Initialize the widget if it doesn't exist
    if (!appInstances[instanceId][widgetId]) {
        appInstances[instanceId][widgetId] = {};
    }

    // Set the property value
    appInstances[instanceId][widgetId][propName] = propValue;

    res.status(200).json({ message: 'Data stored successfully' });
});

// GET endpoint to retrieve an app instance object by Instance ID (secured with API key authentication)
app.get('/instance/:instanceId', authenticate, (req, res) => {
    const { instanceId } = req.params;

    if (!appInstances[instanceId]) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    res.status(200).json(appInstances[instanceId]);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
