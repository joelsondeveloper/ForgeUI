import React, { useState } from 'react';
import { ForgeUIRenderer } from './renderer-react/src/ForgeUIRenderer';
import { generateForgeUI } from './services/gemini';

export default function PrompterApp() {
  const [doc, setDoc] = useState<any>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const newDoc = await generateForgeUI(input);
      setDoc(newDoc);
    } catch (err) {
      alert("Erro ao gerar. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#020617', overflow: 'hidden' }}>
      
      {/* SIDEBAR DE COMANDO */}
      <div style={{ 
        width: '350px', 
        borderRight: '1px solid #1e293b', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#070a14' 
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: 'white', fontSize: '20px', margin: 0 }}>ForgeUI <span style={{ color: '#6366f1' }}>AI</span></h1>
          <p style={{ color: '#64748b', fontSize: '12px' }}>V2.1 - Powered by Gemini</p>
        </div>

        <textarea 
          placeholder="O que vamos construir hoje?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ 
            flex: 1, 
            padding: '16px', 
            borderRadius: '12px', 
            border: '1px solid #1e293b', 
            backgroundColor: '#0f172a', 
            color: 'white', 
            resize: 'none',
            fontSize: '14px',
            lineHeight: '1.5',
            outline: 'none'
          }}
        />

        <button 
          onClick={handleGenerate}
          disabled={loading}
          style={{ 
            marginTop: '16px',
            padding: '16px', 
            borderRadius: '12px', 
            backgroundColor: loading ? '#312e81' : '#6366f1', 
            color: 'white', 
            fontWeight: '800', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            border: 'none',
            transition: 'all 0.2s'
          }}
        >
          {loading ? "PROCESSANDO..." : "CONSTRUIR SITE"}
        </button>
      </div>

      {/* CANVAS DE PREVIEW */}
      <div style={{ flex: 1, position: 'relative', overflowY: 'auto', backgroundColor: '#000' }}>
        {doc ? (
          <ForgeUIRenderer 
            document={doc} 
            onDocumentChange={(updated: any) => setDoc(updated)} 
          />
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            color: '#334155' 
          }}>
             <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
             <p>Descreva uma interface para começar</p>
          </div>
        )}

        {/* INDICADOR DE LOADING NO CANVAS */}
        {loading && (
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px', 
            padding: '8px 16px', 
            backgroundColor: '#6366f1', 
            color: 'white', 
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            IA ESTÁ PENSANDO...
          </div>
        )}
      </div>
    </div>
  );
}