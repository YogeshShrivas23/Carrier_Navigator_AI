from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import PyPDF2
import docx
import io
import os

app = Flask(__name__)
CORS(app)

def extract_text_from_pdf(pdf_content):
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(docx_content):
    doc = docx.Document(io.BytesIO(docx_content))
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

@app.route('/parse-resume', methods=['POST'])
def parse_resume():
    try:
        data = request.json
        file_content = base64.b64decode(data['file'])
        filename = data['filename']
        
        # Determine file type and extract text
        if filename.lower().endswith('.pdf'):
            text = extract_text_from_pdf(file_content)
        elif filename.lower().endswith('.docx'):
            text = extract_text_from_docx(file_content)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400
        
        # Basic parsing (can be enhanced with more sophisticated parsing)
        parsed_data = {
            'text': text,
            'filename': filename
        }
        
        return jsonify(parsed_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PYTHON_PARSER_PORT', 5001))
    app.run(host='0.0.0.0', port=port) 