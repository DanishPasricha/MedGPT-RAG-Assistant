# Medical Chatbot with LLMs, LangChain, Pinecone, and Flask

# How to run?
### STEPS:

Clone the repository

```bash
git clone https://github.com/DanishPasricha/MedGPT-RAG-Assistant.git
```
### STEP 01- Create a conda environment after opening the repository

```bash
conda create -n medibot python=3.10 -y
```

```bash
conda activate medibot
```


### STEP 02- install the requirements
```bash
pip install -r requirements.txt
```


### Create a `.env` file in the root directory and add your Pinecone & openai credentials as follows:

```ini
PINECONE_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
OPENAI_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```


```bash
# run the following command to store embeddings to pinecone
python store_index.py
```

```bash
# Finally run the following command
python app.py
```

Now,
```bash
open up http://localhost:8080 in your browser
```


### Techstack Used:

- Python
- LangChain
- Flask
- GPT-4o (OpenAI)
- Pinecone
- HuggingFace Embeddings (sentence-transformers/all-MiniLM-L6-v2)
