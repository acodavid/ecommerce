import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className='grid md:grid-cols-4 gap-4 p-4'>
          <div className='space-y-2'>
            <ShoppingBag />
            <div className='text-sm font-bold'>Бесплатна достава</div>
            <div className='text-sm text-muted-foreground'>
              Бесплатна достава за поруџбине преко 100 КМ
            </div>
          </div>
          <div className='space-y-2'>
            <DollarSign />
            <div className='text-sm font-bold'>Гаранција поврата новца</div>
            <div className='text-sm text-muted-foreground'>
              У року од 30 дана од куповине
            </div>
          </div>
          <div className='space-y-2'>
            <WalletCards />
            <div className='text-sm font-bold'>Флексибилно плаћање</div>
            <div className='text-sm text-muted-foreground'>
              Плаћајте кредитном картицом, PayPal-ом или при испоруци
            </div>
          </div>
          <div className='space-y-2'>
            <Headset />
            <div className='text-sm font-bold'>24/7 Подршка</div>
            <div className='text-sm text-muted-foreground'>
              Подршка доступна у свако доба
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
