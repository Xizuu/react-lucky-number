'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast, Toaster } from 'react-hot-toast'
import { Slot } from '@/components/slot'

export default function LuckySlotGame() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(['0', '0', '0'])
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const generateSecretNumber = () => {
    setResult([
        '0',
        '0',
        '0'
    ])
    setGameOver(false)
    setAttempts(0)
  }

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setAttempts(attempts + 1);

    const spinDuration = 2000;
    const spinInterval = 50;
    const totalSpins = spinDuration / spinInterval;

    let currentSpin = 0;
    let finalResult = ['0', '0', '0'];

    const spinTimer = setInterval(() => {
      if (currentSpin < totalSpins) {
        const newResult = [
          (Math.floor(Math.random() * 9) + 1).toString(),
          (Math.floor(Math.random() * 9) + 1).toString(),
          (Math.floor(Math.random() * 9) + 1).toString(),
        ];

        finalResult = newResult;

        setResult(newResult);
        currentSpin++;
      } else {
        clearInterval(spinTimer);
        setSpinning(false);

        setResult(finalResult);
        checkResult(finalResult);
      }
    }, spinInterval);
  };

  const checkResult = (finalResult) => {
    const same = finalResult.every(num => num === finalResult[0]);

    if (same) {
      setGameOver(true);
      toast.success('Jackpot! Anda mendapatkan tiga angka!');
    } else {
      toast.error('Gagal! coba lagi!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">Lucky Slot</h1>
        <div className="flex justify-center mb-8">
          {result.map((num, index) => (
            <Slot key={index} number={num} spinning={spinning} />
          ))}
        </div>
        <Button 
          onClick={handleSpin} 
          className="w-full mb-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
          disabled={spinning || gameOver}
        >
          {spinning ? 'Berputar...' : 'Putar!'}
        </Button>
        <p className="text-center mb-4 text-yellow-400">Jumlah percobaan: {attempts}</p>
        {gameOver && (
          <Button
            onClick={generateSecretNumber}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
          >
            Main Lagi
          </Button>
        )}
      </div>
    </div>
  )
}