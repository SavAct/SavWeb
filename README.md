# SavWeb

A system to upload and display files on EOSIO blockchains.

[![SavWeb in a Nutshell (Video)](https://img.youtube.com/vi/ROG_GScnam0/0.jpg)](https://www.youtube.com/watch?v=ROG_GScnam0)

# Examples

A gif image uploaded to the EOS mainnet:

https://savact.app/#d15d756ff84cfd033c3efe7f4e9ec07b76e931a4b49f783751aaf9a5b70ab88d@207168743:eos

The first immortal website ([source code](https://github.com/SavAct/SavWeb-Pages/tree/main/Free%20Speech)) on EOS:

https://savact.app/#savactsavact:eos

This [token sale contract](https://github.com/SavAct/TokenSale) provides the [GUI](https://github.com/SavAct/SavWeb-Pages/tree/main/Token%20Sale%20GUI) for participation itself:

https://savact.app/#savact

# Principle

A transaction on an EOSIO blockchain contains all the data of a file. So, the file itself is on the blockchain history and not on EOSIO RAM.

Large files can be split into several transactions and are therefore distributed over several blocks of the blockchain. The principle of linking the data is pretty similar to the [SDC Network Traffic Data Logger for medical devices](https://github.com/KevinTuncer/sdc-data-safe). The EOSIO RAM is only used to store a reference to the transaction and helps by uploading the files. Each transaction of a split file refers to the previous transaction. The last transaction refers also to the first transaction, which contains the properties of the file. After a file has been completely uploaded, only the id and block number of the last transaction is necessary to find the file in the blockchain history.

These files are immutable, but real-world applications need some updates over time. Therefore, you can use an EOSIO RAM table to list references to your uploaded files and just change the entries to link to newer files. A table entry is defined by the contract name, table name, scope, and primary key.  
With the [SavAct browser](https://savact.app/#/_browser_) you can access these entries and share them like normal links.

The browser can display uncompressed and compressed html files like normal websites and offers further features over the [JavaScript postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method to keep the file size small. For example, you can handle EOSIO payments, read EOSIO table entries and get other files from the blockchain by using the endpoint management system of the browser. Thus, it is not even needed to import eosjs in the dAPP. But you can import JavaScript web frameworks as well as IPFS files via IPFS proxies.

## NFTs with measurable value

The hash of a file is stored anyway, so the files can be interpreted as NFTs. But unlike other NFT platforms, these NFTs stay online forever.

Some websites may integrate already uploaded files from other users. This saves resources to upload the files again. If the origin file is not free to use, the browser can inform the client that the website owner has not purchased the right to reuse that file (NFT). The files are still accessible for everyone, but the website owner is under light pressure to purchase the NFT. In that way, the NFT has real value. At least the value of the resources to upload the file again.

# Actions and tables

The following actions are used to upload a file. If possible, try to upload the whole file at once by using this transaction:

```cpp
/**
 * First transaction to start the upload of a file.
 * Additional parameters will be used to verify the files with the browser.
 *
 * @param scope Scope of the entry
 * @param key Index key of the entry
 * @param fname File name
 * @param type Type of the file
 * @param format Encryption format
 * @param fsize Number of bytes of the complete file
 * @param attri Optional attributes of the file
 * @param originators All originators with their share
 * @param resalefee This is the fee which will be granted to the originators by considering the share of each originator. Fee = (max value of uint16_t) / resalefee.
 * @param hash The hash of the file as byte array
 * @param code The first byte section of the file
*/
ACTION uploadbegin(name scope, uint64_t key, string& fname, string& type, string& format, uint32_t fsize, string& attri, string& originators, uint16_t resalefee, string& hash, string& code);
```

Otherwise the following transaction will be used afterwards to add the rest of the file. For big files, this action can be executed several times. Before the upcoming EOSIO Mendel update, there is no option to get the current block number within a contract. Therefore, one transaction before the last transaction is also sent to the `uploadnext` action. In this way the contract can verify if the transaction regards to the last one.

```cpp
/**
 * Upload the next file snipped.
 *
 * @param scope Scope of the entry
 * @param key Index key of the entry
 * @param refs refs[0] reference to last transaction.
 *             refs[1] reference to the old last transaction.
 *             refs[2] reference to the first transaction.
 * refs[2] is optional and only recommended for the last transaction.
 * @param code The next byte section of the file
*/
ACTION uploadnext(name scope, uint64_t key, vector<Ref>& refs, string& code);
```

The following table can store references to a file and will be interpreted by the SavAct browser.

```cpp
/**
 * Table to store SavWeb files.
 *
 * ref[0] contains a reverence to the first transaction.
 * If the file is portioned, there is a second entry ref[1]
 * with a reference to the last entry.
*/
TABLE static_index_table {
	uint64_t      key;        // Primary key
	string        fname;      // Filename with name extension
	vector<Ref>   refs;       // References
	string        attri;      // Attributes / optional moreover stuff

	auto primary_key() const { return key; }
};
typedef multi_index<"index"_n, static_index_table> index_table;

```

```cpp
/**
 * Reference to a transaction on the blockchain composed of
 * the block number and transaction id
*/
struct Ref{
	uint64_t Block;
	checksum256 TrxId;
};

```

# Security thoughts

Each file will be uploaded with the `hash` and byte size `fsize` of the whole file. Therefore, the browser can verify that a split file was not altered. Furthermore, the browser stops the download immediately if the downloaded data gets bigger than defined in `fsize`. If a file was split into too small data pieces for several transactions, the download process will stop as well. In combination this will prevent the download of malicious uploads, which should overload the network traffic.

The SavAct browser itself can completely be delivered as an html file. So, it is not needed to install any other software beside a common internet browser to access the immortal files. This is more secure for your system than downloading an exe file and it is difficult to censor this browser application from the internet later on.
The website / files on the blockchain are shown in an iframe object. A displayed website will get a random sequence of characters from the SavAct browser. This sequence will be used as a validation token. If the website wants to access some extra features of the browser, it has to send this token back for verification.
In this way, the browser notices when a website redirects to another website, without telling the browser beforehand.

# Name scheme

There are two different types of addresses. One refers directly to the uploaded file of the blockchain and the other refers to a EOSIO RAM table entry. Many of the parameters can be omitted, in which case default values are automatically used instead.

Full scheme to an immutable file:

`#{transaction id}@{block number}:{blockchain network}`

Full scheme to a RAM table entry with uint64 primary key:

`#{scope}@{scontract}:{blockchain network}/{table name}!{primary key number}`

Full scheme to RAM table entry with name as primary key:

`#{scope}@{scontract}:{blockchain network}/{table name}/!{primary key name}`

Further signs like `#` or `&` can still be added to this scheme, which will be forwarded to the displayed immutable website.

## Default values

Ultimately `#{contract name}` is sufficient to define a link; all other parameters have default values.

| description        | default value         |
| ------------------ | --------------------- |
| Blockchain network | `eos`                 |
| Table name         | `index`               |
| Primary key number | `0`                   |
| Scope              | Same as contract name |

## Why this scheme

### Beginning with a hash

As mentioned above the browser should be available as a simple html file, but you should also be able to share links to your immutable webapp. Therefore, each address has to start with the hash sign `#`. This is the only sign to set parameters, which does not reload the whole page one changes and works also on local files.

I.e. the address for `#savact:eos` opened via a local html file would look like this in your browser:

`file:///C:/SavActApp/index.html#savact:eos`

And like this on the web:

`https://savact.app/#savact:eos`

### Colon `:`

The contract name and scope can contain a dot. Therefore, the double point should be used to select the blockchain network. It is not so far-fetched i.e., if you own the contract account name `example.com` you could share a link with
`#exapmle.com:kylin`

### At sign `@`

If you have a contract which hosts several user websites, each user can have its own scope and does not need to upload its own contract. The contract may have extra features for online shops, forums or something like that. The link could look like this for several users:

`#seller123@shop`,

`#sportshouse@shop`,

If you already know the contract you do not have to check it again for every user and `seller123` "at" the contract `shop` seems to me very elegant to recognize this directly.

### Slash sign `/`

Following typical URLs, different tables are defined with the slash.

### Exclamation mark `!`

For numbers this seems suitable, because the hash sign is already in use for anchors.

### Slash sign with exclamation mark `/!`

By using a primary key, you dive deeper in the hierarchy, so it is comprehensible to use the slash. But if you omit the table name, it would be misinterpreted. Therefore, it is followed by the exclamation mark like the public key number

# File upload

1. Upload the contract or use an already uploaded one of another user.
2. Open the [SavAct app](https://savact.app/) and login into your EOSIO account i.e. via the Anchor Wallet. There is an online version of the app: https://savact.app/
3. Go to the [file upload section](https://savact.app/#/_fileupload_/).
4. Enter the contract data and your file.
5. Select your compression methods and find the optimum between a small file size or small EOSIO NET bandwidth.
6. Enter optionally information to handle the uploaded file as NFT later on.
7. Upload the file in a single transaction or split it up. After finishing the transaction, upload the next transactions.

# Testing

- To show test networks in the app, click on the [settings icon in the menu](https://savact.app/#/_settings_/connection) are optionally listed EOSIO test networks as well.
- The address abbreviation for the Kylin test network is just `kylin`.
- To display a file and test the communication with the browser, just drag and drop it in the address bar of the [browser](https://savact.app/#/_browser_).

# Next features

- implement LiquidStorage in the browser to access websites which are completely stored there.
- use standardized NFT schemes and make them tradable by adding a fee for the origin creator of the file.
