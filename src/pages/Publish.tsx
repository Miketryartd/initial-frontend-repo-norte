import { useState, } from "react";
import Layout from "./LayoutWrapper";
import { DynamicUrl } from "./DynamicUrl";




function Publish() {

  const [file, setFile] = useState<FileList | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);



  const publish = async (e: React.FormEvent) =>{
   e.preventDefault();
   if (!file|| file.length === 0) return alert("Select at least one file");

   const formData = new FormData();
   Array.from(file).forEach((file) => {
    formData.append("files", file); 
  });

  formData.append("subject", subject);
  formData.append("description", description);

if (cover) {
  formData.append("cover_photo", cover);
}

if (!file || !subject || !description || !cover ){
  alert("Please complete everything.");
  return;
}

 

   try {
    const response = await fetch (`${DynamicUrl()}/files`, {
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
        <div className="flex flex-row gap-5">


<div className="flex-1">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Select File / Photo
  </label>

  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-sky-200 rounded-2xl cursor-pointer hover:bg-sky-50 transition-all">
    <span className="text-sm font-medium text-sky-600">
      Click to upload files
    </span>
    <span className="text-xs text-gray-400 mt-1">
      PDF, Images, Notes
    </span>

    <input
      type="file"
      name="file"
      multiple
      onChange={(e) => setFile(e.target.files)}
      className="hidden"
    />
    {file && (
  <div className="mt-2 text-xs text-gray-500 space-y-1">
    {Array.from(file).map((f, i) => (
      <p key={i}>📄 {f.name}</p>
    ))}
  </div>
)}

  </label>
</div>


<div className="flex-1">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Select Cover Photo
  </label>

  <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-sky-200 rounded-2xl cursor-pointer hover:bg-sky-50 transition-all">

    <span className="text-sm font-medium text-sky-600">
      Upload Cover Image
    </span>
    <span className="text-xs text-gray-400 mt-1">
      JPG / PNG recommended
    </span>

    <input
      type="file"
      name="photo"
      onChange={(e) => {
        const selected = e.target.files?.[0] || null;
        setCover(selected);
      
        if (selected) {
          setCoverPreview(URL.createObjectURL(selected));
        }
      }}
      
      className="hidden"
    
    />

{coverPreview && (
  <img
    src={coverPreview}
    alt="Cover Preview"
    className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
  />
)}

  </label>
  
</div>

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