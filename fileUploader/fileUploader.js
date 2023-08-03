import {LightningElement, api, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class FileUploader extends LightningElement {

    @api
    parentId;
    @track
    documents = [];

    handleFileUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.documents = this.documents.concat(uploadedFiles);

        this.dispatchEvent(
            new CustomEvent(
                'filesuploaded',
                {
                    detail:
                        {
                            uploadedFiles: uploadedFiles,
                            parentId: this.parentId
                        }
                }
            )
        );
    }

    handleDeleteFile(event) {

        const docId = event.target.dataset.docid;
        this.documents.splice(this.documents.findIndex(doc => doc.documentId === docId), 1);

        this.dispatchEvent(
            new CustomEvent('filedeleted', {detail: {docId: docId, parentId: this.parentId}})
        );

        deleteFile({documentId: docId})
            .then(data => {
            })
            .catch(error => {
                console.log('deleteFile error:', error);
                const reducedError = reduceErrors(error);
                console.log('deleteFile reducedError:', reducedError);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'deleteFile Error',
                        message: Array.isArray(reducedError) ? reducedError[0] : reducedError,
                        variant: 'error',
                        mode: 'sticky'
                    })
                );
            })
            .finally(onFinal => {
            });
    }
}