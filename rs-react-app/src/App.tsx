import { useState } from 'react';
import { Modal } from './components/Modal';
import { UncontrolledForm } from './components/UncontrolledForm.tsx';
import { type FormData } from './utils/validation';
import { useFormsStore } from './store/useFormsStore.ts';

function App() {
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);

  const addUncontrolled = useFormsStore((s) => s.addUncontrolled);
  const uncontrolled = useFormsStore((s) => s.uncontrolled);
  const controlled = useFormsStore((s) => s.controlled);

  const handleUncontrolledSubmit = (data: FormData) => {
    addUncontrolled(data);
    setModalA(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Main Page</h1>
        <p className="text-gray-600">Choose a form to open</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => setModalA(true)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200 min-w-[200px]"
        >
          Uncontrolled Form
        </button>
        <button
          onClick={() => setModalB(true)}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-colors duration-200 min-w-[200px]"
        >
          Controlled Form
        </button>
      </div>

      <Modal isOpen={modalA} onClose={(): void => setModalA(false)}>
        <h2 className="text-lg font-semibold mb-2">Uncontrolled Form</h2>
        <UncontrolledForm onSubmit={handleUncontrolledSubmit} />
      </Modal>

      <Modal isOpen={modalB} onClose={(): void => setModalB(false)}>
        <h2 className="text-lg font-semibold mb-2">Controlled Form</h2>
      </Modal>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {uncontrolled.map((formData, index) => (
          <div key={index} className="p-4 border rounded-lg shadow bg-white">
            <p>
              <b>{formData.name}</b> ({formData.age} y.o.)
            </p>
            <p>{formData.email}</p>
            <p>{formData.country}</p>
            {formData.picture && (
              <img
                src={formData.picture}
                alt="preview"
                className="w-16 h-16 mt-2 grayscale-30 sepia-50 rounded-full"
              />
            )}
          </div>
        ))}
        {controlled.map((formData, index) => (
          <div key={index} className="p-4 border rounded-lg shadow bg-white">
            <p>
              <b>{formData.name}</b> ({formData.age} y.o.)
            </p>
            <p>{formData.email}</p>
            <p>{formData.country}</p>
            {formData.picture && (
              <img
                src={formData.picture}
                alt="preview"
                className="w-16 h-16 mt-2 grayscale-30 sepia-50 rounded-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
