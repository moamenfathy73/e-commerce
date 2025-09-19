import React from 'react';
import Image from 'next/image';
import amazonPay from '../../assets/Amazon_Pay_logo.png';
import masterCard from '../../assets/MasterCard-Logo.png';
import payPal from '../../assets/PayPal.png';
import googlePlay from '../../assets/get-it-on-google-play-badge.png';
import appleStore from '../../assets/get-it-on-apple-store.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <div className="footer py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5 md:px-0">

        {/* App download section */}
        <div className="mb-6 text-center md:text-left">
          <h5 className="text-2xl font-semibold text-green-700 mb-2">Get the FreshCart App</h5>
          <p className="text-gray-600">We will send you a link, open it on your phone to download the app</p>
        </div>

        {/* Email input + Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Input
            className="w-full"
            type="text"
            placeholder="Email .."
          />
          <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto px-6">
            Share App Link
          </Button>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Payment partners + App badges */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Payment Partners */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-medium text-gray-700">Payment Partners:</span>
            <div className="flex gap-3">
              <Image src={amazonPay} alt="Amazon Pay" width={50} height={30} className='object-contain' />
              <Image src={masterCard} alt="MasterCard" width={50} height={30} className='object-contain' />
              <Image src={payPal} alt="PayPal" width={50} height={30} className='object-contain' />
            </div>
          </div>

          {/* App download badges */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <span className="text-gray-700 font-medium text-center md:text-left">Get deliveries with FreshCart</span>
            <div className="flex gap-3">
              <Image src={googlePlay} alt="Google Play" width={120} height={40} className='object-contain' />
              <Image src={appleStore} alt="Apple Store" width={120} height={40} className='object-contain' />
            </div>
          </div>

        </div>

        <div className="border-t border-gray-300 mt-8"></div>
      </div>
    </div>
  );
}
