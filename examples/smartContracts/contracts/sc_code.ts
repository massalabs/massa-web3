import {
  generateEvent,
  Context,
  callerHasWriteAccess,
  Storage,
} from '@massalabs/massa-as-sdk';
import { Args, Result, Serializable, stringToBytes } from '@massalabs/as-types';

const MUSIC_ALBUM_KEY = 'MUSIC_ALBUM_KEY';

class MusicAlbum implements Serializable {
  constructor(
    public id: string = '',
    public title: string = '',
    public artist: string = '',
    public album: string = '',
    public year: u64 = 0,
  ) {}

  public serialize(): StaticArray<u8> {
    const args = new Args();
    args.add(this.id);
    args.add(this.title);
    args.add(this.artist);
    args.add(this.album);
    args.add(this.year);
    return args.serialize();
  }

  public deserialize(data: StaticArray<u8>, offset: i32 = 0): Result<i32> {
    const args = new Args(data, offset);

    const id = args.nextString();
    if (id.isErr()) {
      return new Result(0, "Can't deserialize the id");
    }
    this.id = id.unwrap();

    const title = args.nextString();
    if (title.isErr()) {
      return new Result(0, "Can't deserialize the title");
    }
    this.title = title.unwrap();

    const artist = args.nextString();
    if (artist.isErr()) {
      return new Result(0, "Can't deserialize the artist");
    }
    this.artist = artist.unwrap();

    const album = args.nextString();
    if (album.isErr()) {
      return new Result(0, "Can't deserialize the album");
    }
    this.album = album.unwrap();

    const year = args.nextU64();
    if (year.isErr()) {
      return new Result(0, "Can't deserialize the year");
    }
    this.year = year.unwrap();

    return new Result(args.offset);
  }
}

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _args - Arguments serialized with Args
 */
export function constructor(): StaticArray<u8> {
  // This line is important. It ensure that this function can't be called in the future.
  // If you remove this check someone could call your constructor function and reset your SC.
  if (!callerHasWriteAccess()) {
    return [];
  }
  generateEvent(
    `Constructor called on contract ${Context.callee().toString()}`,
  );
  createInitialMusicShop();
  return [];
}

function createInitialMusicShop(): void {
  const musicAlbum = new MusicAlbum('1', 'CD', 'Nirvana', 'Nevermind', 1991);
  Storage.set(
    stringToBytes(`${MUSIC_ALBUM_KEY}_${musicAlbum.id}`),
    musicAlbum.serialize(),
  );
}

export function addMusicAlbum(binaryArgs: StaticArray<u8>): void {
  // convert the binary input to Args
  const args: Args = new Args(binaryArgs);

  // safely unwrap the request data
  const musicAlbum: MusicAlbum = args.nextSerializable<MusicAlbum>().unwrap();

  // assemble the storage key
  const storageKey = `${MUSIC_ALBUM_KEY}_${musicAlbum.id}`;

  // check music album does not already exist
  const musicAlbumExists = Storage.has(storageKey);
  assert(!musicAlbumExists, 'Music Album already exists');

  // save music album to storage
  Storage.set(stringToBytes(storageKey), musicAlbum.serialize());
}

export function getMusicAlbum(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  // convert the binary input to Args
  const args = new Args(binaryArgs);

  // safely unwrap the request data
  const musicAlbumId = args.nextString().unwrap();

  // assemble the storage key
  const storageKey = `${MUSIC_ALBUM_KEY}_${musicAlbumId}`;

  // check music album must already exist
  const musicAlbumExists = Storage.has(storageKey);
  assert(musicAlbumExists, 'Music Album does not exist');

  // get the serialized music album info
  return Storage.get(stringToBytes(storageKey));
}

export function deleteMusicAlbum(binaryArgs: StaticArray<u8>): void {
  // convert the binary input to Args
  const args = new Args(binaryArgs);

  // safely unwrap the request data
  const musicAlbumId = args.nextString().unwrap();

  // assemble the storage key
  const storageKey = `${MUSIC_ALBUM_KEY}_${musicAlbumId}`;

  // check music album must already exist
  const musicAlbumExists = Storage.has(storageKey);
  assert(musicAlbumExists, 'Music Album does not exist');

  // delete the serialized music album info
  return Storage.del(stringToBytes(storageKey));
}
