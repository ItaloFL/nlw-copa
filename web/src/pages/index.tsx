import Image from 'next/image'
import ImagePreview from '../assets/preview-images.png'
import LogoImg from '../assets/logo.svg'
import AvatarsImg from '../assets/avatares.png'
import CheckedIcon from '../assets/icon.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number
  guessesCount: number
  userCount: number
}

export default function Home({
  poolCount,
  guessesCount,
  userCount
}: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert(
        'Bolão criado com sucesso o codigo foi copiado para sua area de transferencia'
      )

      setPoolTitle('')
    } catch (error) {
      alert('Houve algum erro')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={LogoImg} alt="Nlw Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={AvatarsImg} alt="" />

          <strong className="text-gray-100 text-xl font-bold">
            <span className="text-green-550">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-550  px-6 py-4 rounded text-gray-800 font-bold text-sm uppercase hover:bg-yellow-750"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="flex justify-between mt-10 pt-10 border-t border-gray-600 text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={CheckedIcon} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={CheckedIcon} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={ImagePreview} alt="" quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count')
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}
