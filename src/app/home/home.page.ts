import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    matches:string[];
    products:Product[];
    searchProduct:Product;
    speech:string;

    constructor(private speechRecongnition: SpeechRecognition) {
        this.products = [
            {id:1,name:"アイス",price:200},
            {id:2,name:"水",price:100},
            {id:3,name:"おせんべい",price:150}
        ]
    }

    startListening(){

        // Check feature available
        this.speechRecongnition.isRecognitionAvailable()
        .then((available: boolean) => console.log(available))
        
        // Check permission
        this.speechRecongnition.hasPermission()
        .then((hasPermission: boolean) => console.log(hasPermission))
        // Request permissions
        this.speechRecongnition.requestPermission()
        .then(
            () => console.log('Granted'),
            () => console.log('Denied')
        )

        let options = {
            language: 'ja-JP',
            matches:5,
            prompt:"",
            showPopup:true,
            showPartial:true
        }
        this.speechRecongnition.startListening(options).subscribe(matches => {
            this.matches = matches;
        });

    }

    stopListening(){
        //ios
        this.speechRecongnition.stopListening();

    var cnt=0;

    for (let i = 0; i < this.products.length; i++) {
        var speech = this.matches[i];

        // console.log(speech);
        var searchProduct = this.products.filter(products => products.name == speech);
            if(searchProduct.length){
                // console.log(searchProduct);
                this.speech = speech;
                this.searchProduct = {
                    id:searchProduct[0].id,
                    name:searchProduct[0].name,
                    price:searchProduct[0].price
                }
                cnt++;
            }

    }
    if(cnt==0){

        this.searchProduct = {
            id:0,
            name:'該当なし',
            price:0
        }
    }
  }

}
class Product{
  id:number;
  name:string;
  price:number;
}
