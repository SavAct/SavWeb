#pragma once
#include <eosio/eosio.hpp>
#include <vector>

using namespace std;
using namespace eosio;

#define index_table_name name("index")

/**
 * Reference to a transaction on the blockchain composed of the block number and transaction id
*/
struct Ref{
  uint64_t Block;
  checksum256 TrxId;
};

struct [[ eosio::table, eosio::contract("site")]] static_index_table {
  uint64_t      key;        // Primary key
  string        fname;      // File name with name extention
  vector<Ref>   refs;       // ref[0] contains reffered trasnaction of the first transaction. If the file is portioned there is a second entry ref[1] with a reference to the last entry  
  string        attri;      // Attributes / optional moreover stuff
  
  auto primary_key() const { return key; }
};
typedef multi_index<index_table_name, static_index_table> IndexTable;