import express, { Request, Response } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';

const app = express();
const port = 3000;

const upload = multer({ dest: 'data/uploads/' });


AWS.config.update({
    region: 'your-region',
    // other configurations as necessary
});
const s3 = new AWS.S3();

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Perform file validation
    const validationResult = () => {

    }
    if (!validationResult.isValid) {
        // Cleanup uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(400).send(validationResult.error);
    }


    res.send({ message: 'File is valid and was successfully uploaded.' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
