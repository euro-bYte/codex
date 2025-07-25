import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
  selectedFile?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.pdf,.png,.jpg,.jpeg',
  maxSizeMB = 5,
  label = 'Upload Document',
  helperText = 'Upload your Certificate of Insurance (COI) or policy document',
  selectedFile = null,
}) => {
  const [file, setFile] = useState<File | null>(selectedFile);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const selectedFile = files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    
    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    // Check file type if accept is specified
    if (accept !== '*') {
      const fileType = selectedFile.type;
      const fileExtension = `.${selectedFile.name.split('.').pop()}`;
      const acceptTypes = accept.split(',');
      
      // Check if file type or extension is in the accepted list
      const isAccepted = acceptTypes.some(type => 
        type.trim() === fileType || 
        type.trim() === fileExtension.toLowerCase() ||
        (type.trim().includes('/*') && fileType.startsWith(type.trim().replace('/*', '/')))
      );
      
      if (!isAccepted) {
        setError(`File type not accepted. Please upload ${accept.replace(/\./g, '').replace(/,/g, ', ')}`);
        return;
      }
    }
    
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
        aria-label={label}
      />
      
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          } ${error ? 'border-red-300 bg-red-50' : ''}`}
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-gray-500">
              {helperText}
            </p>
            <p className="text-xs text-gray-500">
              Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <button
              type="button"
              className="ml-4 flex-shrink-0 text-sm text-red-500 hover:text-red-700"
              onClick={removeFile}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
