'use client';

import React from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { counterAddress, counterAbi } from '@/config';
import { ConnectKitButton } from 'connectkit';
import Image from 'next/image';
export default function DAppTemplate() {
  const { address, isConnected } = useAccount();

  // 1. 读取合约的 x 值
  const { data: count, refetch } = useReadContract({
    address: counterAddress,
    abi: counterAbi,
    functionName: 'x',
  });

  // 2. 准备写入合约的 increment 函数
  const { data: hash, writeContract } = useWriteContract();

  // 3. 等待交易被打包确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    });

  // 当交易确认后，重新获取最新的 count 值
  React.useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, refetch]);

  const handleIncrement = async () => {
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'inc',
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Image src="/icon.JPG" alt="logo" width={40} height={40} />
          </div>
        </div>
        
        {/* Connect Wallet Button */}
        <ConnectKitButton />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative">
        {/* Side Icons */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Solidity DApp Template
          </h1>
          
          {!isConnected ? (
            <p className="text-xl text-gray-600 mb-8">
              Please connect your wallet to view your assets
            </p>
          ) : (
            <div className="space-y-6">
              <p className="text-xl text-gray-600 mb-8">
                Wallet Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
              
              {/* Counter Section */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Counter Contract
                </h2>
                
                <div className="mb-6">
                  <p className="text-lg text-gray-600 mb-2">Current Value:</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {count?.toString() || 'Loading...'}
                  </p>
                </div>

                <button
                  onClick={handleIncrement}
                  type="button"
                  disabled={isConfirming}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  {isConfirming ? 'Incrementing...' : 'Increment Counter'}
                </button>

                {hash && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Transaction Hash: {hash}
                    </p>
                  </div>
                )}
                
                {isConfirmed && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-semibold">
                      ✅ Transaction Confirmed!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}