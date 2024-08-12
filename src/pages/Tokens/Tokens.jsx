import './Tokens.css'
import TokensTable from '../../component/TokensTable/TokensTable';
import CreateTokenModal from '../../component/CreateTokenModal/CreateTokenModal';

const Tokens = () => {
  
  return (
    <main className=" bg-c4  px-2 lg:px-5 pt-4">
      <header className='modelHeader  mb-10'>
        <div className="left">
          <span className="modelName">{"All Tokens"}</span>
        </div>
        <div className="right">
          <CreateTokenModal />
        </div>
      </header>
      <TokensTable />
    </main>
  )
}

export default Tokens