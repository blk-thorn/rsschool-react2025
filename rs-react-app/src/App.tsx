import { useState } from 'react';
import { Modal } from './components/Modal';

function App() {
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);

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

      <Modal isOpen={modalA} onClose={() => setModalA(false)}>
        <h2 className="text-lg font-semibold">Uncontrolled Form</h2>
      </Modal>

      <Modal isOpen={modalB} onClose={() => setModalB(false)}>
        <h2 className="text-lg font-semibold">Controlled Form</h2>
      </Modal>
    </div>
  );
}

export default App;
