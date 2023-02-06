import { FC, memo, useState, useCallback, useMemo, ChangeEvent } from 'react';
import {
  Unstable_Grid2 as Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Transaction,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import AmountSelect from './AmountSelect/AmountSelect';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import { ResultsSubmitProps } from './ResultsSubmit.types';

const ResultsSubmitBase: FC<ResultsSubmitProps> = ({ isDisabled = false }) => {
  const [selectedNums, setselectedNums] = useState<any[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BONK');
  const [selectedBetAmount, setSelectedBetAmount] = useState<number>(100_000);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();
  const { connected, publicKey, sendTransaction } = useWallet();

  const onCurrencyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedCurrency((event.target as HTMLInputElement).value);
    },
    [],
  );

  const onAmountChange = useCallback((event: any) => {
    setSelectedBetAmount(event.target.value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!connected) {
      return enqueueSnackbar('Connect you wallet first', {
        variant: 'warning',
      });
    }

    setIsSubmitting(true);

    const numsArray = selectedNums.map(({ number }) => number);
    const numsSorted = numsArray.sort((a, b) => a - b);

    const resultString = numsSorted.join('-');
    console.log(resultString);

    if (!publicKey) {
      setIsSubmitting(false);
      throw new WalletNotConnectedError();
    }

    //here things are set up to work for SOL transaction
    console.log('preparing to submit');
    //amount of SOL to be sent. 1_000_000 == 0.001SOL so scale accordingly
    const lamportsToSend = 1_000_000;
    //converting the entry wallet to the correct address
    const toKeypair = new PublicKey(
      'kinvUZn9fQ2dGCnqY1hSMEjhdxNKTL7SHAZHtY7siFd',
    );

    //Below here is implementation of SPL TOKEN TRANSFER
    //this is the BONK token hash
    const BONK = new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');

    //this is the bonk token account, linked to the treasury
    const toBonkKeypair = new PublicKey(
      'Cd8FV17MZr2BoWv2vtPqWpD79rTdWUyW4vvcshuBDrkj',
    );

    //get the BONK token account linked to player
    const fromAssociatedTokenAccountPubkey = await getAssociatedTokenAddress(
      BONK,
      publicKey,
    );

    //output to console for personal use/checking
    console.log(fromAssociatedTokenAccountPubkey.toString());
    console.log(toBonkKeypair.toString());
    console.log(publicKey.toString());
    //1_000_00 = 1 BONK
    const scale = 1_000_00;
    //number hardcoded, to become user input
    const betAmount = selectedBetAmount * scale;
    //pass in the betAmount as the amount to be transferred.

    //using info above use to send a TX with spl-token
    const transferTransaction = new Transaction().add(
      createTransferInstruction(
        fromAssociatedTokenAccountPubkey,
        toBonkKeypair,
        publicKey, // fromWallet.publicKey,
        betAmount,
        [],
        TOKEN_PROGRAM_ID,
      ),
    );

    //This is the memo part of the transaction, to write the entry on chain
    await transferTransaction.add(
      new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from(resultString, 'utf-8'),
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
      }),
    );

    //and here we are simple sending the TX and confirming it.
    const signature = await sendTransaction(transferTransaction, connection);
    console.log(signature);

    await connection.confirmTransaction(signature, 'processed');
    console.log('Entry Proccessed');

    enqueueSnackbar('Results successfully submitted', {
      variant: 'success',
    });

    setIsSubmitting(false);
  }, [
    selectedNums,
    selectedBetAmount,
    enqueueSnackbar,
    publicKey,
    sendTransaction,
    connection,
    connected,
  ]);

  return (
    <Grid>
      <Grid container spacing={2} alignItems="center">
        <CurrencySelect
          selectedCurrency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
        />

        <AmountSelect
          selectedBetAmount={selectedBetAmount}
          onAmountChange={onAmountChange}
        />

        <Grid xs={12}>
          <Button
            fullWidth
            color="success"
            variant="contained"
            onClick={onSubmit}
            disabled={isDisabled}
            sx={{
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            Bet {selectedBetAmount} of {selectedCurrency}
            {isSubmitting && <CircularProgress size={16} />}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const ResultsSubmit = memo(ResultsSubmitBase);

export default ResultsSubmit;
