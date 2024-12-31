export default class Fox {
    private foxId : number;
    private photoPath : string;
    private name : string;
    private description : string;
    private likesAmount : number;
    private foxType : number;

    constructor(foxId : number, photoPath : string, name : string, description : string, likesAmount : number, foxType : number) {
        this.foxId = foxId;
        this.photoPath = photoPath;
        this.name = name;
        this.description = description;
        this.likesAmount = likesAmount;
        this.foxType = foxType;
    }

    public getFoxId() : number {return this.foxId; }

    public setFoxId(foxId : number) {this.foxId = foxId; }

    public getPhotoPath() : string { return this.photoPath; }

    public setPhotoPath(photoPath : string) { this.photoPath = photoPath; }

    public getName() : string { return this.name; }

    public setName(name : string) { this.name = name; }

    public getDescription() : string { return this.description; }

    public setDescription(description : string) { this.description = description; }

    public getLikesAmount() : number { return this.likesAmount; }

    public setLikesAmount(likesAmount : number) { this.likesAmount = likesAmount; }

    public getFoxType() : number { return this.foxType; }

    public setFoxType(foxType : number) { this.foxType = foxType; }
}
