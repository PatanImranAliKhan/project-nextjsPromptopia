"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

function Nav() {

  const { data: session } = useSession();
  const [providers, setproviders] = useState([{ id: 1 }])
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const resp = await getProviders();
      setproviders(resp);
    }

    setProviders();
  }, [])


  return (
    <nav className='w-full flex-between mb-16 pt-3'>
      <Link href="/" className='flex flex-gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" className='object-contain'
          width={30} height={30} alt='logo' />
        <p className='logo_text'>&nbsp;Promptopia</p>
      </Link>

      <div className='sm:flex hidden'>
        {
          session?.user ?
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className='black_btn'>
                create post
              </Link>
              <button type='button' onClick={() => { signOut() }} className='outline_btn'>
                Signout
              </button>
              <Link href="/profile">
                <Image src={session?.user.image}
                  width={37} height={37} alt='profile' className='rounded-full' />
              </Link>
            </div> :
            <div>
              {
                providers && Object.values(providers).map((provider) =>
                  <button type='button' key={provider.name}
                    onClick={() => { signIn(provider.id) }}
                    className='black_btn'
                  >Signin</button>
                )
              }
            </div>
        }
      </div>

      {/* Mobile Navigation  */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div>
              <Image src={session?.user.image}
                width={37} height={37} alt='profile'
                className='rounded-full'
                onClick={() => settoggleDropdown((prev) => !prev)}
              />
              {
                toggleDropdown && (
                  <div className='dropdown'>
                    <Link href="/profile"
                      className='dropdown_link'
                      onClick={() => settoggleDropdown(false)}
                    >
                      profile
                    </Link>
                    <Link href="/create-prompt"
                      className='dropdown_link'
                      onClick={() => settoggleDropdown(false)}
                    >
                      Create-Prompt
                    </Link>
                    <button type='button'
                      onClick={() => {
                        settoggleDropdown(false);
                        signOut();
                      }}
                      className='black_btn mt-5 w-full'
                    >
                      Signout
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <div>
              {
                providers && Object.values(providers).map((provider) =>
                  <button type='button' key={provider.name}
                    onClick={() => { signIn(provider.id) }}
                    className='black_btn'
                  >Signin</button>
                )
              }
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Nav