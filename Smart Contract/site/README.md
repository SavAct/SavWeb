# SavWeb

Contract to upload files to an Antelope blockchain.

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
