import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';

import EditAdminProfileCard from '../Cards/EditAdminProfileCard';
import AdminOrdersForm from '../Forms/AdminOrdersForm';
import axios from 'axios';

function AdminProfile(props) {

  return (
    <>
      <div className="w-full px-4 pt-8">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <Disclosure as="div" className="mt-2">
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Информация</span>
              {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              <EditAdminProfileCard />
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Бронирования</span>
              {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              <AdminOrdersForm></AdminOrdersForm>
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Номера</span>
              {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              Здесь будут карточки номеров
            </Disclosure.Panel>
          </Disclosure>
        </div>
      </div>
    </>
  )
}

export default AdminProfile;
