import { useState, useEffect } from "react";
import Layout from "./LayoutWrapper";
import { useNavigate } from "react-router-dom";


function Publish() {

  const [file, setFile] = useState<FileList | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const nav = useNavigate();

  const publish = async (e: React.FormEvent) =>{
   e.preventDefault();
   if (!file|| file.length === 0) return alert("Select at least one file");

   const formData = new FormData();
   Array.from(file).forEach((file) => {
    formData.append("files", file); 
  });

  formData.append("subject", subject);
  formData.append("description", description);

 

   try {
    const response = await fetch ('http://localhost:5000/files', {
      method: "POST",
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
      body: formData,
    });

    const data = await response.json();
    alert("Published succesfully");
    console.log("Published data:", data);
   } catch (err){
    console.error('Upload error:', err);
   }
  }


  return (
    <Layout>
      <div className="max-w-xl mx-auto py-16 px-6">
     
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Publish Notes</h1>
          <p className="text-gray-500 mt-2">Upload your study materials to the community.</p>
        </div>

      
        <form className="space-y-5" action="/files" method="POST" encType="multipart/form-data" onSubmit={publish}>
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
            <input 
              type="file" 
              name="file"
              multiple
              onChange={(e) => setFile(e.target.files)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition-all cursor-pointer"
            />
          </div>

          <input 
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" 
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject Name" 
          />

          <textarea 
            className="w-full border border-gray-300 p-4 rounded-xl h-40 resize-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..." 
          />

          <button className="w-full bg-sky-500 hover:bg-sky-600 cursor-pointer text-white py-4 rounded-xl font-bold transition-colors shadow-sm">
            Post to Feed
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Publish;